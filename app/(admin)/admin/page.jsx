'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AdminPackageForm from '@/components/admin/package-form';
import AdminPackageTable from '@/components/admin/package-table';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const queryClient = useQueryClient();
  const [editingPackage, setEditingPackage] = useState(null);
  const [resetSignal, setResetSignal] = useState(0);

  const { data: adminRow, isLoading: adminLoading } = useQuery({
    queryKey: ['admin-check', user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data;
    },
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  const isAdmin = Boolean(adminRow?.user_id);

  const { data: packages = [], isLoading: packagesLoading } = useQuery({
    queryKey: ['packages'],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const createPackage = useMutation({
    mutationFn: async (payload) => {
      const { data, error } = await supabase
        .from('packages')
        .insert(payload)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      setEditingPackage(null);
      setResetSignal((prev) => prev + 1);
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });

  const updatePackage = useMutation({
    mutationFn: async (payload) => {
      const { id, ...update } = payload;
      const { data, error } = await supabase
        .from('packages')
        .update(update)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      setEditingPackage(null);
      setResetSignal((prev) => prev + 1);
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });

  const deletePackage = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('packages').delete().eq('id', id);

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });

  const content = useMemo(() => {
    if (loading || adminLoading) {
      return (
        <Card className="border-border/50 bg-card/80 backdrop-blur p-8">
          <p className="text-muted-foreground">Checking access...</p>
        </Card>
      );
    }

    if (!user) {
      return (
        <Card className="border-border/50 bg-card/80 backdrop-blur p-8 space-y-4">
          <h2 className="text-xl font-semibold">Admin Login Required</h2>
          <p className="text-sm text-muted-foreground">
            Please sign in to access the admin dashboard.
          </p>
          <Button onClick={() => router.push('/login')}>Go to Login</Button>
        </Card>
      );
    }

    if (!isAdmin) {
      return (
        <Card className="border-border/50 bg-card/80 backdrop-blur p-8 space-y-3">
          <h2 className="text-xl font-semibold">Access Denied</h2>
          <p className="text-sm text-muted-foreground">
            Your account does not have admin access.
          </p>
        </Card>
      );
    }

    return (
      <div className="grid lg:grid-cols-[1.1fr_1.4fr] gap-8">
        <AdminPackageForm
          onSubmit={(payload) => {
            if (payload.id) {
              updatePackage.mutate(payload);
            } else {
              createPackage.mutate(payload);
            }
          }}
          isSubmitting={createPackage.isPending || updatePackage.isPending}
          initialData={editingPackage}
          resetSignal={resetSignal}
          onCancelEdit={() => setEditingPackage(null)}
        />
        {packagesLoading ? (
          <Card className="border-border/50 bg-card/80 backdrop-blur p-8">
            <p className="text-muted-foreground">Loading packages...</p>
          </Card>
        ) : (
          <AdminPackageTable
            packages={packages}
            onDelete={(id) => {
              if (confirm('Delete this package?')) {
                deletePackage.mutate(id);
              }
            }}
            onEdit={(pkg) => setEditingPackage(pkg)}
            isDeleting={deletePackage.isPending}
          />
        )}
      </div>
    );
  }, [
    adminLoading,
    createPackage.isPending,
    deletePackage.isPending,
    updatePackage.isPending,
    isAdmin,
    loading,
    resetSignal,
    packages,
    packagesLoading,
    router,
    user,
    editingPackage,
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage travel packages shown on the public packages page.
          </p>
        </div>
        {content}
      </div>
    </main>
  );
}
