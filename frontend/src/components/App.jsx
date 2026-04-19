import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { getUserAuth } from "../action";

// Layout components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import AIAssistant from "./AIAssistant";
import CustomCursor from "./CustomCursor";

// Public pages
import Login from "./Login";
import SignIn from "../pages/SignIn";
import Signup from "../pages/Signup";

// Admin (standalone, no shared layout)
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

// Pending (standalone)
import PendingVerification from "./PendingVerification";

// Authenticated pages
import Home from "./Home";
import Messages from "./Messages";
import Profile from "./Profile";
import Events from "./Events";
import Referrals from "./Referrals";
import BusinessExchange from "./BusinessExchange";
import Promotions from "./Promotions";
import Marketplace from "./Marketplace";
import OrganizerPortal from "./OrganizerPortal";

// ─── Shared layout for verified users ───────────────────────────────────────
function AuthLayout({ children, showJobs, setShowJobs }) {
	const location = useLocation();
	return (
		<div className="min-h-screen bg-[var(--bg-primary)]">
			<Header />
			<Sidebar showJobs={showJobs} />
			<main className="ml-0 md:ml-[280px] py-6 px-4 md:py-8 md:px-6 flex justify-center transition-[margin-left] duration-300">
				<div className="w-full max-w-[900px] animate-fadeIn">
					{React.Children.map(children, child =>
						React.isValidElement(child)
							? React.cloneElement(child, { showJobs, setShowJobs })
							: child
					)}
				</div>
			</main>
			<AIAssistant currentPage={location.pathname} />
			<Footer />
		</div>
	);
}

// ─── Route Guards ────────────────────────────────────────────────────────────

// Loading spinner while Firebase auth resolves
function LoadingScreen() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-[#0a0618]">
			<div className="flex flex-col items-center gap-4">
				<div className="w-12 h-12 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
				<span className="text-white/40 text-sm font-medium">Authenticating...</span>
			</div>
		</div>
	);
}

// Requires Firebase Auth user
function PrivateRoute({ children, user, isLoading }) {
	if (isLoading) return <LoadingScreen />;
	if (!user) return <Navigate to="/" replace />;
	return children;
}

// Requires verified status — redirect to /pending if not yet verified
function VerifiedRoute({ children, user, isLoading, showJobs, setShowJobs }) {
	if (isLoading) return <LoadingScreen />;
	if (!user) return <Navigate to="/" replace />;
	if (user.verificationStatus && user.verificationStatus !== 'verified') {
		return <Navigate to="/pending" replace />;
	}
	return (
		<AuthLayout showJobs={showJobs} setShowJobs={setShowJobs}>
			{children}
		</AuthLayout>
	);
}

// Individual-only route (individual)
function IndividualRoute({ children, user, isLoading, showJobs, setShowJobs }) {
	if (isLoading) return <LoadingScreen />;
	if (!user) return <Navigate to="/" replace />;
	if (user.verificationStatus !== 'verified') return <Navigate to="/pending" replace />;
	if (user.role !== 'individual') return <Navigate to="/organizer" replace />;
	return (
		<AuthLayout showJobs={showJobs} setShowJobs={setShowJobs}>
			{children}
		</AuthLayout>
	);
}

// Organizer-only route (business_owner)
function OrganizerRoute({ children, user, isLoading, showJobs, setShowJobs }) {
	if (isLoading) return <LoadingScreen />;
	if (!user) return <Navigate to="/" replace />;
	if (user.verificationStatus !== 'verified') return <Navigate to="/pending" replace />;
	if (user.role !== 'business_owner') return <Navigate to="/feed" replace />;
	return (
		<AuthLayout showJobs={showJobs} setShowJobs={setShowJobs}>
			{children}
		</AuthLayout>
	);
}

// Admin dashboard guard — checks localStorage token
function AdminRoute({ children }) {
	if (!localStorage.getItem('adminToken')) return <Navigate to="/admin" replace />;
	return children;
}

// ─── Root App ─────────────────────────────────────────────────────────────────
function App({ getUserAuth, user }) {
	const [isLoading, setIsLoading] = useState(true);
	const [showJobs, setShowJobs] = useState(localStorage.getItem('hirex_show_jobs') !== 'false');

	useEffect(() => {
		getUserAuth();
		// Give Firebase a moment to resolve auth state before showing routes
		const timer = setTimeout(() => setIsLoading(false), 1500);
		return () => clearTimeout(timer);
	}, [getUserAuth]);

	useEffect(() => {
		localStorage.setItem('hirex_show_jobs', showJobs);
	}, [showJobs]);

	const routeProps = { user, isLoading, showJobs, setShowJobs };

	return (
		<div className="App">
			<Router>
				<CustomCursor />
				<Routes>
					{/* ── Public ─────────────────────────────── */}
					<Route path="/" element={<Login />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/signup" element={<Signup />} />

					{/* ── Pending Verification (standalone) ──── */}
					<Route path="/pending" element={
						<PrivateRoute user={user} isLoading={isLoading}>
							<PendingVerification />
						</PrivateRoute>
					} />

					{/* ── Admin (standalone, no shared layout) ── */}
					<Route path="/admin" element={<AdminLogin />} />
					<Route path="/admin-dashboard" element={
						<AdminRoute>
							<AdminDashboard />
						</AdminRoute>
					} />

					{/* ── Individual user pages ─────────────── */}
					<Route path="/feed"        element={<IndividualRoute {...routeProps}><Home /></IndividualRoute>} />
					<Route path="/marketplace" element={<IndividualRoute {...routeProps}><Marketplace /></IndividualRoute>} />
					<Route path="/profile"     element={<IndividualRoute {...routeProps}><Profile /></IndividualRoute>} />
					
					{/* ── Shared Authenticated pages ─────────── */}
					<Route path="/messages"    element={<VerifiedRoute {...routeProps}><Messages /></VerifiedRoute>} />
					<Route path="/events"      element={<VerifiedRoute {...routeProps}><Events /></VerifiedRoute>} />
					<Route path="/referrals"   element={<VerifiedRoute {...routeProps}><Referrals /></VerifiedRoute>} />
					<Route path="/business"    element={<VerifiedRoute {...routeProps}><BusinessExchange /></VerifiedRoute>} />
					<Route path="/promotions"  element={<VerifiedRoute {...routeProps}><Promotions /></VerifiedRoute>} />

					{/* ── Business Owner only ───────────────── */}
					<Route path="/organizer" element={<OrganizerRoute {...routeProps}><OrganizerPortal /></OrganizerRoute>} />


					{/* ── Catch-all ─────────────────────────── */}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Router>
		</div>
	);
}

const mapStateToProps = (state) => ({ user: state.userState.user });
const mapDispatchToProps = (dispatch) => ({ getUserAuth: () => dispatch(getUserAuth()) });

export default connect(mapStateToProps, mapDispatchToProps)(App);
