export default function ({ $axios, }) {
    const sleepRequest = (milliseconds, originalRequest) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve($axios(originalRequest)), milliseconds);
        });
    };

    $axios.onError(error => {
      const { config, response: { status }} = error;
      const originalRequest = config;
  
      if (status === 429) {
         return sleepRequest(1000, originalRequest);
      }
    })

  }