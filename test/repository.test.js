import Repository from '../src/Repository';
import RemoteService from '../src/RemoteService';

const listOfRepos = [
  'repo1',
  'repo2',
  'repo3'
];

const mockFetchRepositories = jest.fn();
mockFetchRepositories.mockReturnValue(listOfRepos);

jest.mock('../src/RemoteService', () => {
  return jest.fn().mockImplementation(() => {
    return { fetchRepositories: mockFetchRepositories };
  });
});

describe('Repository', () => {
  const remoteService = new RemoteService;
  const repository = new Repository(remoteService);

  it('should create an instance of repository', () => {
    expect(repository).toBeTruthy();
  });

  it('should create an instance of the remote service', () => {
    expect(repository.remoteService).toBeTruthy();
  });

  describe('.list()', () => {
    let result;

    beforeEach(() => {
      RemoteService.mockClear();
      mockFetchRepositories.mockClear();
      result = repository.list();
    });

    it('should return an array', () => {
      expect(result instanceof Array).toBe(true);
    });

    it('should fetch the repositories from the remote service', () => {
      expect(mockFetchRepositories).toHaveBeenCalled();
    });

    it('should return the list of repos from the remote service', () => {
      expect(result).toEqual(listOfRepos);
    });
  });
});
