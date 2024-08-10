import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("http://apibruno.ddns.net:8090/sistema/selectAll-produtos");
  }

  get(id) {
    return http.get(`/tutorials/${id}`);
  }

  create(data) {
    return http.post("http://apibruno.ddns.net:8090/sistema/cadastro-produto", data);
  }

  update(data) {
    return http.post("http://apibruno.ddns.net:8090/sistema/update-produto", data);
  }

  delete(data) {
    return http.post("http://apibruno.ddns.net:8090/sistema/delete-produto", data);
    //return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new TutorialDataService();
