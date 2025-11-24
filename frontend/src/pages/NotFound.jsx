import Loader from "@/components/kokonutui/loader";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* <h1 className="text-4xl font-bold text-gray-500">404 Not Found</h1> */}
      <Loader />
    </div>
  );
}
