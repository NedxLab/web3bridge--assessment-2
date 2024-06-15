import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

export interface IDesk {
  name: string;
  status: string;
  id: number;
  space: string;
}
function App() {
  const desks: IDesk[] = [
    {
      name: "Desk 1",
      status: "Available",
      id: 1,
      space: "individual",
    },
    {
      name: "Desk 2",
      status: "Available",
      id: 2,
      space: "individual",
    },
    {
      name: "Desk 3",
      status: "Available",
      id: 3,
      space: "individual",
    },
    {
      name: "Desk 4",
      status: "Available",
      id: 4,
      space: "individual",
    },
    {
      name: "Desk 5",
      status: "Available",
      id: 5,
      space: "individual",
    },
    {
      name: "Desk 6",
      status: "Available",
      id: 6,
      space: "individual",
    },
    {
      name: "Desk 7",
      status: "Available",
      id: 7,
      space: "individual",
    },
    {
      name: "Desk 8",
      status: "Available",
      id: 8,
      space: "individual",
    },
    {
      name: "Desk 9",
      status: "Available",
      id: 9,
      space: "individual",
    },
    {
      name: "Desk 10",
      status: "Available",
      id: 10,
      space: "individual",
    },
    {
      name: "Desk 11",
      status: "Available",
      id: 11,
      space: "team",
    },
    {
      name: "Desk 12",
      status: "Available",
      id: 12,
      space: "team",
    },
    {
      name: "Desk 13",
      status: "Available",
      id: 13,
      space: "team",
    },
    {
      name: "Desk 14",
      status: "Available",
      id: 14,
      space: "team",
    },
    {
      name: "Desk 15",
      status: "Available",
      id: 15,
      space: "team",
    },
  ];

  const [space, setSpace] = useState("individual");
  const [chosenSpace, setChosenSpace] = useState<IDesk[] | []>([]);
  const [numberOfHours, setNumberOfHours] = useState<number>(1);
  const [amountPerHour, setAmountPerHour] = useState<number>(10);
  const choseSpace = desks.filter((desk) => desk.space === space);
  const storedSpace = JSON.parse(
    localStorage.getItem("state") as unknown as string
  );

  return (
    <div className="App">
      <div className="flex mt-10">
        <div className="container text-center">
          <div className="row">
            <button
              className="col p-2"
              onClick={() => {
                setSpace("individual");
                setChosenSpace([]);
              }}
            >
              Individual
            </button>
            <button
              className="col p-2"
              onClick={() => {
                setSpace("team");
                setChosenSpace([]);
              }}
            >
              Team Collaboration
            </button>
          </div>
        </div>
        {!chosenSpace[0] &&
          choseSpace.map((space) => (
            <div
              key={space.id}
              className="container"
              onClick={() => {
                if (storedSpace?.space.id == space.id) {
                  return;
                }
                setChosenSpace([space]);
              }}
            >
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{space.name}</h5>
                      <p className="card-text">
                        {storedSpace?.space.id === space.id
                          ? "booked"
                          : space.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {chosenSpace.map((space) => (
          <div
            key={space.id}
            className="container"
            // onClick={() => setChosenSpace(space)}x
          >
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{space.name}</h5>
                    <p className="card-text">{space.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {chosenSpace[0] && (
          <div>
            {chosenSpace[0].space === "individual" ? (
              <div className="container text-center">
                Choose membership tier
                <div className="row">
                  <button
                    className="col p-2"
                    onClick={() => {
                      setAmountPerHour(10);
                    }}
                  >
                    Basic - $10 per hour
                  </button>
                  <button
                    className="col p-2"
                    onClick={() => {
                      setAmountPerHour(15);
                    }}
                  >
                    Premium - $15 per hour
                  </button>
                  <button
                    className="col p-2"
                    onClick={() => {
                      setAmountPerHour(20);
                    }}
                  >
                    Executive - $20 per hour.
                  </button>
                </div>
              </div>
            ) : (
              <div className="container text-center">
                <button
                  className="col p-2"
                  onClick={() => {
                    setAmountPerHour(25);
                  }}
                >
                  For team desks, the price is fixed at $25 per hour.
                </button>
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="hours" className="form-label">
                how many hours?
              </label>
              <input
                type="number"
                className="form-control"
                id="hours"
                min={0}
                max={24}
                value={numberOfHours}
                onChange={(e) => setNumberOfHours(parseInt(e.target.value))}
              />
            </div>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="inputPassword6" className="col-form-label">
                  Amount you pay
                </label>
              </div>

              <div className="col-auto">
                <span id="passwordHelpInline" className="form-text">
                  ${" "}
                  {numberOfHours < 4
                    ? amountPerHour * numberOfHours
                    : amountPerHour * numberOfHours -
                      amountPerHour * numberOfHours * 0.1}
                </span>
              </div>
              {numberOfHours > 3 && (
                <h6>
                  Users booking for more than 3 hours get a 10% discount on the
                  total amount.
                </h6>
              )}
            </div>
            <button
              className="bg-success text-white px-2 py-1 border-white"
              onClick={() =>
                localStorage.setItem(
                  "state",
                  JSON.stringify({
                    space: chosenSpace[0],
                    amountPerHour: amountPerHour,
                    numberOfHours: numberOfHours,
                  })
                )
              }
            >
              Book
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
