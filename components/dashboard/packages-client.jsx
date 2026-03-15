"use client";

import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PackageDialog from "@/components/dashboard/package-dialog";

/**
 * @param {{ initialPackages: import('@/lib/supabase/types').Package[] }} props
 */
export default function PackagesClient({ initialPackages }) {
  const [packages, setPackages] = useState(initialPackages);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  const openEdit = (pkg) => {
    setEditing(pkg);
    setDialogOpen(true);
  };

  const handleSubmit = async (values) => {
    setIsSaving(true);
    try {
      if (editing?.id) {
        const { id } = editing;
        const { data, error } = await supabase
          .from("packages")
          .update(values)
          .eq("id", id)
          .select()
          .single();

        if (error) throw error;

        setPackages((prev) =>
          prev.map((item) => (item.id === id ? data : item)),
        );
        toast.success("Package updated");
      } else {
        const { data, error } = await supabase
          .from("packages")
          .insert(values)
          .select()
          .single();

        if (error) throw error;

        setPackages((prev) => [data, ...prev]);
        toast.success("Package added");
      }
      setDialogOpen(false);
      setEditing(null);
    } catch (error) {
      toast.error("Failed to save package");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this package?")) return;
    try {
      const { error } = await supabase.from("packages").delete().eq("id", id);
      if (error) throw error;
      setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
      toast.success("Package deleted");
    } catch (error) {
      toast.error("Failed to delete package");
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Packages</h2>
          <p className="text-sm text-muted-foreground">
            Add, edit, and manage travel packages.
          </p>
        </div>
        <Button
          className="bg-primary/10 text-primary hover:bg-primary/5 cursor-pointer"
          onClick={openCreate}
        >
          Add Package
        </Button>
      </div>

      <div className="rounded-xl border border-border/60 bg-card/80 backdrop-blur">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-sm">
                  No packages yet.
                </TableCell>
              </TableRow>
            ) : (
              packages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.name}</TableCell>
                  <TableCell>{pkg.destination}</TableCell>
                  <TableCell>{pkg.duration} days</TableCell>
                  <TableCell>₹ {pkg.price}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        className="hover:!bg-primary/10 hover:text-primary cursor-pointer"
                        onClick={() => openEdit(pkg)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        className="hover:!bg-destructive/10 hover:text-destructive cursor-pointer"
                        onClick={() => handleDelete(pkg.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <PackageDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) setEditing(null);
          setDialogOpen(open);
        }}
        initialValues={editing}
        onSubmit={handleSubmit}
        isSubmitting={isSaving}
      />
    </section>
  );
}
