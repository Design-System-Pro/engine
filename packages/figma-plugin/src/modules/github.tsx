import { Octokit } from "@octokit/core";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type GithubContextProps = {
  token?: string;
  setToken: Dispatch<SetStateAction<string | undefined>>;
};

const GithubContext = createContext<GithubContextProps>({
  setToken: () => {},
});

export function GithubProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string>();

  return (
    <GithubContext.Provider value={{ token, setToken }}>
      {children}
    </GithubContext.Provider>
  );
}

export function useGithub() {
  // TODO: allow the user to choose which repo and owner
  const repo = "project-ds-tokens";
  const owner = "tomasfrancisco";

  const { token, setToken } = useContext(GithubContext);
  const [octokit, setOctokit] = useState<Octokit>();

  useEffect(() => {
    if (!token) return;

    setOctokit(
      new Octokit({
        auth: token,
      })
    );
  }, [token]);

  const createPullRequest = useCallback(() => {
    if (!octokit) return;

    octokit.request("POST /repos/{owner}/{repo}/git/blobs", {
      repo,
      owner,
      encoding: "base64",
      content: "base64 enconded content",
    });
    octokit.request("POST /repos/{owner}/{repo}/git/trees", {
      owner,
      repo,
      base_tree: "base_tree_sha????",
      tree: [
        {
          path: "path/to/file",
          mode: "100644",
          type: "blob",
          sha: "blob_sha????",
        },
      ],
    });
    octokit.request("POST /repos/{owner}/{repo}/git/commits", {
      repo,
      owner,
      message: "commit message????",
      tree: "tree_sha????",
      parents: ["parent_commit_sha????"],
    });
    octokit.request("PATCH /repos/{owner}/{repo}/git/refs/{ref}", {
      repo,
      owner,
      ref: "heads/branch_name????",
      sha: "commit_sha????",
    });
  }, [octokit]);

  const listRepositories = useCallback(async () => {
    if (!octokit) return;

    const response = await octokit.request("GET /user/repos");

    return response.data;
  }, [octokit]);

  const isReady = Boolean(octokit);

  return {
    listRepositories: isReady ? listRepositories : undefined,
    setToken,
    isReady,
  };
}
