import { Typography } from '@mui/material';
import { useState } from 'react';
// import { useSensorsData } from '../../hooks';

const Home = () => {
  // TODO: example
  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);
  //
  // const { data, isLoading, isError } = useSensorsData({ page, pageSize });
  //
  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error fetching sensors data</div>;
  //
  // const { rows, total, totalPages } = data || {
  //   rows: [],
  //   total: 0,
  //   totalPages: 1,
  // };
  //
  // return (
  //   <div>
  //     <h1>Sensors</h1>
  //     <ul>
  //       {rows.map((sensor) => (
  //         <li key={sensor._id}>{JSON.stringify(sensor, null, 2)}</li>
  //       ))}
  //     </ul>
  //     <div>
  //       <p>
  //         Page {page} of {totalPages}
  //       </p>
  //       <button
  //         onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
  //         disabled={page === 1}
  //       >
  //         Previous
  //       </button>
  //       <button
  //         onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
  //         disabled={page === totalPages}
  //       >
  //         Next
  //       </button>
  //     </div>
  //   </div>
  // );
  return <Typography variant="h1">Home</Typography>;
};

export default Home;
