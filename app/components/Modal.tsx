import { X } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";

export function Modal({ children, title, open, onClose }: { children: React.ReactNode, title: string, open: boolean, onClose: () => void }) {
  if(!open) return null;
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full relative max-w-md p-14 bg-white flex flex-col gap-10">
          <X className="absolute top-2 right-2" onClick={onClose} />
          <CardHeader className=" text-xl font-semibold">{title}</CardHeader>
          <CardContent>{children}</CardContent>
            </Card>
            </div>
  );
}