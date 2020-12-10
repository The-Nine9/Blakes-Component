import { sleep } from "k6";
import http from "k6/http";

export const options = {
  scenarios: {
    stress: {
      // name of the executor to use
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 100 },
        { duration: '30s', target: 1500 },
        { duration: '3m', target: 1500 },
        { duration: '30s', target: 2000 },
        { duration: '30s', target: 4000 },
        { duration: '3m', target: 2000 },
        { duration: '30s', target: 1500 },
        { duration: '3m', target: 1500 },
        { duration: '30s', target: 1000 },
        { duration: '3m', target: 1000 },
        { duration: '30s', target: 750 },
        { duration: '3m', target: 750 },
        { duration: '30s', target: 500 },
        { duration: '5m', target: 500 },
        { duration: '5m', target: 200 },
        { duration: '2m', target: 100 },
        { duration: '5s', target: 0 },
      ],
      gracefulRampDown: '5s',
    },
  },
};

export default function main() {
  let response;
  const id = Math.floor(1 + Math.random() * 10000000);
  response = http.get(`http://127.0.0.1:8040/gallery/${id}/homesData`);

  // Automatically added sleep
  sleep(1);
}
// docker run \
//   -d --restart unless-stopped \
//   --name newrelic-statsd \
//   -h $(hostname) \
//   -e NR_ACCOUNT_ID=2979621 \
//   -e NR_API_KEY="NRII-5ybaCxAYGp9AfTKNSPi1KYVMkuGN7I_A" \
//   -p 8125:8125/udp \
//   newrelic/nri-statsd:latest