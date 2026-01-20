import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

// Remove Emergent badge if it exists or gets added
const removeEmergentBadge = () => {
  const badge = document.getElementById('emergent-badge') || 
                document.querySelector('a[href*="emergent.sh"]') ||
                document.querySelector('[id*="emergent"]') ||
                document.querySelector('[class*="emergent-badge"]');
  if (badge) {
    badge.remove();
  }
};

// Remove immediately
removeEmergentBadge();

// Also check periodically in case it's added dynamically
const interval = setInterval(() => {
  removeEmergentBadge();
}, 100);

// Stop checking after 10 seconds
setTimeout(() => {
  clearInterval(interval);
}, 10000);

// Also observe DOM changes
const observer = new MutationObserver(() => {
  removeEmergentBadge();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
