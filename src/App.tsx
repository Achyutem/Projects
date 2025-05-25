import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import TicToe from "./TicTacToe/TicToe";
import Accordion from "./Accordion/Accordion";
import Counter from "./Advance Counter/Counter";
import Translator from "./Translator/Translator";
import NestedCheckbox from "./NestedCheckbox/NestedCheckbox";
import Otp from "./OTP/Otp";
import Stars from "./Stars/Stars";
import Stopwatch from "./Stopwatch/Stopwatch";
import ListTable from "./ListTable/ListTable";
import Todo from "./TODO/Todo";
import Search from "./Search/Search";
import Form from "./Form/Form";
import Quiz from "./Quiz/Quiz";
import DiceRoller from "./DiceRoller/DiceRoller";
import ForwardPe from "./forwardPE/forwardPe";
import Pagination from "./Pagination/Pagination";
import Pomodoro from "./Pomodoro/Pomodoro";

function Home() {
	return (
		<div>
			<h1 className="text-3xl font-bold mb-2">
				🏠 Welcome to the React Component Showcase
			</h1>
			<p className="text-lg text-gray-600">
				Select a component from the menu above to view its functionality.
			</p>
		</div>
	);
}

function App() {
	const navItems = [
		{ path: "/", label: "Home" },
		{ path: "/accordion", label: "Accordion" },
		{ path: "/counter", label: "Counter" },
		{ path: "/translator", label: "Translator" },
		{ path: "/nested-checkbox", label: "Nested Checkbox" },
		{ path: "/otp", label: "OTP" },
		{ path: "/stars", label: "Stars" },
		{ path: "/stopwatch", label: "Stopwatch" },
		{ path: "/list-table", label: "List Table" },
		{ path: "/todo", label: "Todo" },
		{ path: "/search", label: "Search" },
		{ path: "/form", label: "Form" },
		{ path: "/quiz", label: "Quiz" },
		{ path: "/dice-roller", label: "Dice Roller" },
		{ path: "/pagination", label: "Pagination" },
		{ path: "/forward-pe", label: "Forward Pe" },
		{ path: "/pomodoro", label: "Pomodoro" },
		{ path: "/tic-tac-toe", label: "Tic Tac Toe" },
	];

	return (
		<Router>
			<div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
				<nav className="bg-white shadow sticky top-0 z-50">
					<div className="max-w-7xl mx-auto px-4 py-3">
						<ul className="flex flex-wrap gap-3">
							{navItems.map((item) => (
								<li key={item.path}>
									<Link
										to={item.path}
										className="text-sm text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md transition"
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</nav>

				<main className="max-w-6xl mx-auto p-6">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/accordion" element={<Accordion />} />
						<Route path="/counter" element={<Counter />} />
						<Route path="/translator" element={<Translator />} />
						<Route path="/nested-checkbox" element={<NestedCheckbox />} />
						<Route path="/otp" element={<Otp />} />
						<Route path="/stars" element={<Stars />} />
						<Route path="/stopwatch" element={<Stopwatch />} />
						<Route path="/list-table" element={<ListTable />} />
						<Route path="/todo" element={<Todo />} />
						<Route path="/search" element={<Search />} />
						<Route path="/form" element={<Form />} />
						<Route path="/quiz" element={<Quiz />} />
						<Route path="/dice-roller" element={<DiceRoller />} />
						<Route path="/pagination" element={<Pagination />} />
						<Route path="/forward-pe" element={<ForwardPe />} />
						<Route path="/pomodoro" element={<Pomodoro />} />
						<Route path="/tic-tac-toe" element={<TicToe />} />
						<Route
							path="*"
							element={<div className="text-red-500">404 Not Found</div>}
						/>
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
