import { sleep, check } from "k6";
import http from "k6/http";

// ramping stress test

export const options = {
  scenarios: {
    stress: {
      // name of the executor to use
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 100 },
        { duration: '10s', target: 200 },
        { duration: '1m', target: 200 },
        { duration: '10s', target: 500 },
        { duration: '10s', target: 750 },
        { duration: '1m', target: 750 },
        { duration: '10s', target: 1000 },
        { duration: '1m', target: 1000 },
        { duration: '1s', target: 0 },
      ],
      gracefulRampDown: '5s',
    },
  },
};

// working load test

// export const options = {
//   stages = [
//     { duration: '10s', target: 200 },
//     { duration: '40s', target: 200 },
//     { duration: '10s', target: 0 },
//   ]
// }

export default function main() {
  const res = http.get('http://test.k6.io');

  let response;
  const id = Math.floor(1 + Math.random() * 10000000);
  response = http.get(`http://127.0.0.1:8040/home/${id}/homesData`);

  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200,
  });
  // Automatically added sleep
  sleep(1);
}
