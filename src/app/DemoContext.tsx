import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { PersonaState, User, LoyaltyStatus, AppUserId, AppUserProfile } from '@/types';
import { hanako } from '@/mock-data/users';
import { appUserProfileById } from '@/mock-data/appUsers';
import { defaultFeedContext, type FeedContext, type Objective } from '@/services/feedRanking';
import { totalChapters } from './chapters';

/** Selectable app-user profiles for the different home experiences. */
export type AppUser = AppUserId;

interface DemoContextValue {
  /** Current chapter (1-6). */
  chapter: number;
  goToChapter: (id: number) => void;
  nextChapter: () => void;
  prevChapter: () => void;

  /**
   * Fixed persona used by the decisioning mock. The card is always linked
   * in this build, so this is constant.
   */
  persona: PersonaState;
  user: User;
  isLinked: boolean;
  loyalty: LoyaltyStatus;

  /** Selected app-user profile (placeholder for home experience variants). */
  appUser: AppUser;
  setAppUser: (u: AppUser) => void;
  /** Full home-experience definition for the selected app user. */
  appUserProfile: AppUserProfile;

  /** "Why shown now" left panel visibility (opens when tapping the offer). */
  whyOpen: boolean;
  openWhy: () => void;
  closeWhy: () => void;

  /** Decision animation replay token — bump to re-trigger animations. */
  replayToken: number;
  replayDecision: () => void;

  /** Presenter panel visibility (hidden by default; reveal with "P"). */
  presenterOpen: boolean;
  setPresenterOpen: (open: boolean) => void;
  togglePresenter: () => void;

  /** Presenter-only "Behind the scenes" decisioning view. */
  behindOpen: boolean;
  setBehindOpen: (open: boolean) => void;
  toggleBehind: () => void;

  /** Whether the winning offer has been accepted (CTA). */
  offerAccepted: boolean;
  acceptOffer: () => void;
  resetOffer: () => void;

  /** Presenter-mode context that re-ranks the feed live (time/location/weather). */
  feedContext: FeedContext;
  setFeedContext: (patch: Partial<FeedContext>) => void;
  /** Optimisation objective the ranker maximises for (console selector). */
  objective: Objective;
  setObjective: (o: Objective) => void;

  /** Live, mutable V Points balance — updates when the customer redeems. */
  pointsBalance: number;
  addPoints: (n: number) => void;
  /** Category of the most recent redeem, used to re-rank the feed around it. */
  redeemCategory: string | null;
  setRedeemCategory: (c: string | null) => void;
  /** Ids of products redeemed via Muse, newest last — drives the feed spotlight. */
  redeemedProductIds: string[];
  addRedeemedProduct: (id: string) => void;

  /** Reset the whole demo back to its initial state. */
  resetDemo: () => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [chapter, setChapter] = useState(1);
  const [appUser, setAppUser] = useState<AppUser>(1);
  const [replayToken, setReplayToken] = useState(0);
  const [presenterOpen, setPresenterOpen] = useState(false);
  const [behindOpen, setBehindOpen] = useState(false);
  const [whyOpen, setWhyOpen] = useState(false);
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [feedContext, setFeedContextState] = useState<FeedContext>(defaultFeedContext);
  const [objective, setObjective] = useState<Objective>('cashback');
  const [pointsBalance, setPointsBalance] = useState(() => appUserProfileById(appUser).pointsBalance);
  const [redeemCategory, setRedeemCategory] = useState<string | null>(null);
  const [redeemedProductIds, setRedeemedProductIds] = useState<string[]>([]);

  // Reset the live balance and any redeem-based re-rank when the persona changes.
  useEffect(() => {
    setPointsBalance(appUserProfileById(appUser).pointsBalance);
    setRedeemCategory(null);
    setRedeemedProductIds([]);
  }, [appUser]);

  const setFeedContext = useCallback(
    (patch: Partial<FeedContext>) => setFeedContextState((c) => ({ ...c, ...patch })),
    [],
  );
  const addPoints = useCallback((n: number) => setPointsBalance((b) => b + n), []);
  const addRedeemedProduct = useCallback(
    (id: string) => setRedeemedProductIds((ids) => [...ids, id]),
    [],
  );

  const goToChapter = useCallback((id: number) => {
    setChapter(Math.min(Math.max(1, id), totalChapters));
  }, []);

  const nextChapter = useCallback(
    () => setChapter((c) => Math.min(c + 1, totalChapters)),
    [],
  );
  const prevChapter = useCallback(
    () => setChapter((c) => Math.max(c - 1, 1)),
    [],
  );

  const replayDecision = useCallback(() => setReplayToken((t) => t + 1), []);

  const acceptOffer = useCallback(() => setOfferAccepted(true), []);
  const resetOffer = useCallback(() => setOfferAccepted(false), []);
  const togglePresenter = useCallback(() => setPresenterOpen((o) => !o), []);
  const toggleBehind = useCallback(() => setBehindOpen((o) => !o), []);
  const openWhy = useCallback(() => setWhyOpen(true), []);
  const closeWhy = useCallback(() => setWhyOpen(false), []);

  const resetDemo = useCallback(() => {
    setChapter(1);
    setAppUser(1);
    setReplayToken((t) => t + 1);
    setWhyOpen(false);
    setOfferAccepted(false);
    setFeedContextState(defaultFeedContext);
    setObjective('cashback');
    setPointsBalance(appUserProfileById(1).pointsBalance);
    setRedeemCategory(null);
    setRedeemedProductIds([]);
  }, []);

  // The card is always connected in this build.
  const persona: PersonaState = 'linked';
  const isLinked = true;

  const appUserProfile = appUserProfileById(appUser);

  const user = useMemo<User>(
    () => ({
      ...hanako,
      linkedHappyProgram: true,
      pointsBalance,
    }),
    [pointsBalance],
  );

  const loyalty = appUserProfile.loyalty;

  const value: DemoContextValue = {
    chapter,
    goToChapter,
    nextChapter,
    prevChapter,
    persona,
    user,
    isLinked,
    loyalty,
    appUser,
    setAppUser,
    appUserProfile,
    whyOpen,
    openWhy,
    closeWhy,
    replayToken,
    replayDecision,
    presenterOpen,
    setPresenterOpen,
    togglePresenter,
    behindOpen,
    setBehindOpen,
    toggleBehind,
    offerAccepted,
    acceptOffer,
    resetOffer,
    feedContext,
    setFeedContext,
    objective,
    setObjective,
    pointsBalance,
    addPoints,
    redeemCategory,
    setRedeemCategory,
    redeemedProductIds,
    addRedeemedProduct,
    resetDemo,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDemo(): DemoContextValue {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemo must be used within a DemoProvider');
  return ctx;
}
