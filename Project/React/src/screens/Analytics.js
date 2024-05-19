import React, { useState, useEffect } from "react";
import withAdminAuth from "../components/withAdminAuth";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryTheme,
} from "victory";
import AdminNavbar from "../components/AdminNavbar";

function Analytics() {
  const [genreCounts, setGenreCounts] = useState([]);
  const [locationOccurrences, setLocationOccurrences] = useState([]);

  useEffect(() => {
    fetchGenreCounts();
    fetchLocationOccurrences();
  }, []);

  const fetchGenreCounts = () => {
    fetch("http://localhost:5000/api/UserPrefGraph")
      .then((response) => response.json())
      .then((data) => {
        setGenreCounts(data);
      })
      .catch((error) => {
        console.error("Error fetching genre counts:", error);
      });
  };

  const fetchLocationOccurrences = () => {
    fetch("http://localhost:5000/api/LocationOccurrence")
      .then((response) => response.json())
      .then((data) => {
        setLocationOccurrences(data);
      })
      .catch((error) => {
        console.error("Error fetching location occurrences:", error);
      });
  };

  return (
    <>
      <AdminNavbar></AdminNavbar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <div style={{ width: "70%" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h1 className="text-white">Genre Trends</h1>
          </div>
          <div
            style={{
              backgroundColor: "#343a40",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <VictoryChart
              domainPadding={{ x: 50 }}
              theme={VictoryTheme.material}
              height={250} // Decreased height
              width={700}
            >
              <VictoryAxis
                style={{
                  axis: { stroke: "white" },
                  tickLabels: { fill: "white", fontSize: 16 },
                }}
              />
              <VictoryAxis
                dependentAxis
                style={{
                  axis: { stroke: "white" },
                  tickLabels: { fill: "white", fontSize: 16 },
                }}
              />
              <VictoryBar
                data={genreCounts}
                x="genre"
                y="count"
                labelComponent={<VictoryTooltip />}
                style={{
                  data: { fill: "#8884d8" },
                }}
                barWidth={50}
                cornerRadius={5}
              />
            </VictoryChart>
          </div>
        </div>
        <div style={{ width: "70%", marginTop: "50px" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h1 className="text-white">User GeoGraphics</h1>
          </div>
          <div
            style={{
              backgroundColor: "#343a40",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <VictoryChart
              domainPadding={{ x: 50 }}
              theme={VictoryTheme.material}
              height={250} // Decreased height
              width={700}
            >
              <VictoryAxis
                style={{
                  axis: { stroke: "white" },
                  tickLabels: { fill: "white", fontSize: 16 },
                }}
              />
              <VictoryAxis
                dependentAxis
                style={{
                  axis: { stroke: "white" },
                  tickLabels: { fill: "white", fontSize: 16 },
                }}
              />
              <VictoryBar
                data={Object.entries(locationOccurrences).map(
                  ([location, count]) => ({ location, count })
                )}
                x="location"
                y="count"
                labelComponent={<VictoryTooltip />}
                style={{
                  data: { fill: "#33FF68" },
                }}
                barWidth={50}
                cornerRadius={5}
              />
            </VictoryChart>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </>
  );
}
export default withAdminAuth(Analytics);
