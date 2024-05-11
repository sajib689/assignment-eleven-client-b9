import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import ManageFoodsCard from "./ManageFoodsCard";

const ManageFoods = () => {
  const { user } = useContext(AuthContext);
  const { isPending, data, refetch } = useQuery({
    queryKey: ["data"],
    queryFn: () =>
      fetch(`http://localhost:3000/foods?email=${user?.email}`).then((res) =>
        res.json()
      ),
  });
  if (isPending) {
    return <Loader />;
  }
 

  return (
    <div className="container max-w-6xl p-2 mx-auto sm:p-4 dark:text-gray-800">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">My Food List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="w-24" />
          </colgroup>
          <thead className="dark:bg-gray-300">
            <tr className="text-left">
              <th className="p-3">Food Name</th>
              <th className="p-3">Donator Name</th>
              <th className="p-3">Donator Email</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Pickup Location</th>
              <th className="p-3">Delete</th>
              <th className="p-3">Update</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food) => (
              <ManageFoodsCard
                key={food._id}
                food={food}
                refetch={refetch}
              ></ManageFoodsCard>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageFoods;