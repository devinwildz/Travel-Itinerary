'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function AdminPackageTable({
  packages,
  onDelete,
  onEdit,
  isDeleting,
}) {
  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur p-6">
      <h2 className="text-xl font-semibold mb-4">Packages</h2>
      {packages.length === 0 ? (
        <p className="text-sm text-muted-foreground">No packages yet.</p>
      ) : (
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
            {packages.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell className="font-medium">{pkg.name}</TableCell>
                <TableCell>{pkg.destination}</TableCell>
                <TableCell>{pkg.duration}</TableCell>
                <TableCell>{pkg.price}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => onEdit(pkg)}
                      disabled={isDeleting}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-destructive"
                      disabled={isDeleting}
                      onClick={() => onDelete(pkg.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
