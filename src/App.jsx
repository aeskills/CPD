import { useState, useCallback, useEffect } from "react";
import { useProgress } from "./hooks/useProgress";
import { ToastProvider } from "./components/Toast";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import ModuleSelectionPage from "./pages/ModuleSelectionPage";
import SessionPage from "./pages/SessionPage";
import CertificatePage from "./pages/CertificatePage";

export default function App() {
  const {
    progress,
    updateVideoProgress,
    completeNoVideoModule,
    isVideoComplete,
    areAllVideosComplete,
    getModuleVideoProgress,
    getModuleCompletion,
    submitQuiz,
    isModuleUnlocked,
    isModuleComplete,
    isAllComplete,
    setUserName,
    resetProgress,
    updateModuleLinks,
    loginUser,
    updateSchoolName,
    logoutUser,
  } = useProgress();

  const [page, setPage] = useState("landing");
  const [pageData, setPageData] = useState({});
  const [transitioning, setTransitioning] = useState(false);

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
        <div id="app-root">
           {page !== "landing" && (
             <Navbar 
              onNavigate={navigate} 
              currentPage={page} 
              isLoggedIn={progress.isLoggedIn}
              userName={progress.userName}
              onLogout={logoutUser}
             />
           )}

          <main
            className={transitioning ? "page-exit-active" : "page-enter-active"}
            style={{
              transition: "opacity 300ms ease, transform 300ms ease",
            }}
          >
            {page === "landing" && (
              <LandingPage 
                onNavigate={navigate} 
                progress={progress}
              />
            )}

            {page === "modules" && (
              <ModuleSelectionPage
                onNavigate={(target, data) => {
                  // Check if all modules complete → show certificate
                  if (target === "session" && isAllComplete()) {
                    navigate("certificate");
                    return;
                  }
                  navigate(target, data);
                }}
                isModuleUnlocked={isModuleUnlocked}
                isModuleComplete={isModuleComplete}
                getModuleCompletion={getModuleCompletion}
                addToast={addToast}
              />
            )}

            {page === "session" && (
              <SessionPage
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

            {page === "certificate" && (
              <CertificatePage
                userName={progress.userName}
                setUserName={setUserName}
                onNavigate={navigate}
              />
            )}
          </main>
        </div>
      )}
    </ToastProvider>
  );
}
