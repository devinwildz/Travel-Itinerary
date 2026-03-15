import { createClient } from '@/lib/supabase/server';
import PackagesClient from '@/components/dashboard/packages-client';

export default async function PackagesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('packages')
    .select('*')
    .order('created_at', { ascending: false });

  /** @type {import('@/lib/supabase/types').Package[]} */
  const packages = data ?? [];

  return (
    <PackagesClient initialPackages={packages} />
  );
}
