import { describe, expect, it } from '@jest/globals';
import {
  mockArticles,
  mockFailureResult,
  mockHomeRepo,
  mockSuccessResult,
} from '../src/core/mocks/mockArticleRepository';
import { useMostViewedArticles } from '@ui/hooks/customHooks/useMostViewedArticles';
import { render, waitFor } from '@testing-library/react-native';

const HookTestComponent = ({
  repo,
  onRender,
}: {
  repo: any;
  onRender: (state: ReturnType<typeof useMostViewedArticles>) => void;
}) => {
  const hookState = useMostViewedArticles(repo);
  onRender(hookState);
  return null;
};

describe('test useMostViewedArticles', () => {
  it('loads article successfully', async () => {
    let state: ReturnType<typeof useMostViewedArticles> | undefined;

    render(
      <HookTestComponent
        repo={mockHomeRepo(mockSuccessResult)}
        onRender={(val: any) => (state = val)}
      />,
    );

    expect(state?.isMostViewedLoading).toBe(true);
    expect(state?.mostViewedError).toBeNull();
    expect(state?.mostViewedArticles).toEqual([]);

    await waitFor(() => {
      expect(state?.isMostViewedLoading).toBe(false);
      expect(state?.mostViewedError).toBeNull();
      expect(state?.mostViewedArticles).toEqual(mockArticles);
    });
  });

  it('loads article failure', async () => {
    let state: ReturnType<typeof useMostViewedArticles> | undefined;

    render(
      <HookTestComponent
        repo={mockHomeRepo(mockFailureResult)}
        onRender={(val: any) => (state = val)}
      />,
    );

    expect(state?.isMostViewedLoading).toBe(true);
    expect(state?.mostViewedError).toBeNull();
    expect(state?.mostViewedArticles).toEqual([]);

    await waitFor(() => {
      expect(state?.isMostViewedLoading).toBe(false);
      expect(state?.mostViewedError).toEqual(mockFailureResult);
      expect(state?.mostViewedArticles).toEqual([]);
    });
  });
});
