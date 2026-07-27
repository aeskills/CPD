import { useState, useCallback, useEffect } from "react";
import { useProgress } from "./hooks/useProgress";
import { ToastProvider } from "./components/Toast";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import ModuleSelectionPage from "./pages/ModuleSelectionPage";
import SessionPage from "./pages/SessionPage";
import { getStateFromPath } from "./utils/stateConfig";

export default function App() {
  const [currentState, setCurrentState] = useState(() => getStateFromPath());

  const {
    progress,
    updateVideoProgress,
    completeNoVideoModule,
    isVideoComplete,
    areAllVideosComplete,
    getModuleCompletion,
    submitQuiz,
    isModuleUnlocked,
    isModuleComplete,
    isAllComplete,
    updateModuleLinks,
    logoutUser,
  } = useProgress(currentState);

  const [page, setPage] = useState("landing");
  const [pageData, setPageData] = useState({});
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentState(getStateFromPath());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = useCallback((target, data = {}) => {
    setTransitioning(true);
    setTimeout(() => {
      setPage(target);
      setPageData(data);
      setTransitioning(false);
      window.scrollTo(0, 0);
    }, 300);
  }, []);

  return (
    <ToastProvider>
      {(addToast) => (
        <div id="app-root" key={`root-${currentState}`}>
          {page !== "landing" && (
            <Navbar
              onNavigate={navigate}
              currentPage={page}
              isLoggedIn={progress.isLoggedIn}
              userName={progress.userName}
              onLogout={logoutUser}
              currentState={currentState}
            />
          )}

          <main
            className={transitioning ? "page-exit-active" : "page-enter-active"}
            style={{
              transition: "opacity 300ms ease, transform 300ms ease",
              paddingTop: page !== "landing" ? "64px" : "0",
            }}
          >
            {page === "landing" && (
              <LandingPage
                key={`landing-${currentState}`}
                onNavigate={navigate}
                progress={progress}
                currentState={currentState}
              />
            )}

            {page === "modules" && (
              <ModuleSelectionPage
                key={`modules-${currentState}`}
                onNavigate={(target, data) => navigate(target, data)}
                isModuleUnlocked={isModuleUnlocked}
                isModuleComplete={isModuleComplete}
                getModuleCompletion={getModuleCompletion}
                addToast={addToast}
                currentState={currentState}
              />
            )}

            {page === "session" && (
              <SessionPage
                key={`session-${currentState}-${pageData.moduleId || 1}`}
                moduleId={pageData.moduleId || 1}
                onNavigate={navigate}
                updateVideoProgress={updateVideoProgress}
                completeNoVideoModule={completeNoVideoModule}
                isVideoComplete={isVideoComplete}
                areAllVideosComplete={areAllVideosComplete}
                isAllComplete={isAllComplete}
                submitQuiz={submitQuiz}
                progress={progress}
                addToast={addToast}
                updateModuleLinks={updateModuleLinks}
              />
            )}
          </main>
        </div>
      )}
    </ToastProvider>
  );
}
