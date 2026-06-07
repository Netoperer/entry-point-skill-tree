import { Link } from "react-router";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <div className="text-blue-500 flex flex-1 flex-col">
        <Link to={"/entry-point"}>Entry Point</Link>
        <Link to={"/freelancers-cut"}>Freelancer's Cut</Link>
      </div>
    </div>
  );
}
