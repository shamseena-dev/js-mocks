export default class Repository {
  constructor(remoteService) {
    this.remoteService = remoteService;
  }

  list() {
    return this.remoteService.fetchRepositories();
  };
}
