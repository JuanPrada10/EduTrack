import Loader from "@/components/kokonutui/loader";

export default function LoaderGlobal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <Loader />
    </div>
  );
}
