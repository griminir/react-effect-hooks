import apiClient from './api-client';

export interface User {
  id: number;
  name: string;
}

class userService {
  getAllUsers() {
    const controller = new AbortController();
    const request = apiClient.get<User[]>('/users', {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  deleteUser(id: number) {
    return apiClient.delete('/users/' + id);
  }

  createUser(user: User) {
    return apiClient.post<User>('/users', user);
  }
}

export default new userService();
