import { BASE_URL } from "../config";

export const siginUser = async () => {
  const response = await fetch(`${BASE_URL}/signin`);
  const data = await response.json();
  if (data.success) {
    resolve();
  }
};
