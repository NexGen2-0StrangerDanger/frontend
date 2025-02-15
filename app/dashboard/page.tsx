"use client";
import React, { useState } from "react";
import { FiShield, FiAlertTriangle, FiCheckCircle, FiXCircle, FiCpu } from "react-icons/fi";

// Define the type for a network system
type System = {
  id: number;
  name: string;
  ip: string;
  underAttack: boolean;
  attackType?: string;
  pcap?: string;
};

// Sample data of systems on the network
const systems: System[] = [
  { id: 1, name: "System A", ip: "192.168.1.10", underAttack: true, attackType: "DDoS", pcap: "attack_log_A.pcap" },
  { id: 2, name: "System B", ip: "192.168.1.11", underAttack: false },
  { id: 3, name: "System C", ip: "192.168.1.12", underAttack: true, attackType: "MITM", pcap: "attack_log_C.pcap" },
  { id: 4, name: "System D", ip: "192.168.1.13", underAttack: false }
];

export default function Dashboard() {
  const [selectedSystem, setSelectedSystem] = useState<System | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  // Function to select a system
  const handleSelectSystem = (system: System) => {
    setSelectedSystem(system);
    setFeedback(""); // Reset feedback when selecting a new system
  };

  // Handle user feedback
  const handleFeedback = (response: string) => {
    setFeedback(response);
    alert(`Feedback submitted: ${response}. The system will adjust its learning model.`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow sticky top-0 z-10 px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Network Dashboard</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar - List of Systems */}
        <div className="w-1/4 bg-white shadow-lg overflow-y-auto p-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Network Systems</h2>
          {systems.map((system) => (
            <div
              key={system.id}
              className={`p-4 mb-2 flex items-center cursor-pointer border rounded-lg ${
                system.underAttack ? "bg-red-100 border-red-500" : "bg-green-100 border-green-500"
              } hover:shadow-md transition-all`}
              onClick={() => handleSelectSystem(system)}
            >
              <FiCpu className="h-6 w-6 text-gray-700 mr-3" />
              <div>
                <p className="font-medium text-gray-800">{system.name}</p>
                <p className="text-gray-600 text-sm">{system.ip}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Panel - Attack Details */}
        <div className="w-3/4 p-6 overflow-y-auto">
          {selectedSystem ? (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900">{selectedSystem.name} - {selectedSystem.ip}</h2>
              {selectedSystem.underAttack ? (
                <>
                  <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500">
                    <FiAlertTriangle className="h-8 w-8 text-red-600 inline-block mr-2" />
                    <span className="text-xl font-semibold text-red-700">
                      Under Attack: {selectedSystem.attackType}
                    </span>
                  </div>
                  <div className="mt-4">
                    {selectedSystem.pcap && (
                      <p className="text-gray-700">
                        PCAP File: <span className="font-mono">{selectedSystem.pcap}</span>
                      </p>
                    )}
                    <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                      View PCAP Data
                    </button>
                  </div>

                  {/* Feedback Section */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900">Is this attack real?</h3>
                    <div className="flex space-x-4 mt-2">
                      <button
                        className="px-4 py-2 flex items-center bg-green-500 text-white rounded-lg hover:bg-green-600"
                        onClick={() => handleFeedback("Confirmed Malicious")}
                      >
                        <FiCheckCircle className="mr-2" /> Yes, it's real
                      </button>
                      <button
                        className="px-4 py-2 flex items-center bg-red-500 text-white rounded-lg hover:bg-red-600"
                        onClick={() => handleFeedback("False Positive")}
                      >
                        <FiXCircle className="mr-2" /> No, it's a false alarm
                      </button>
                    </div>
                    {feedback && (
                      <p className="mt-4 text-gray-700">
                        <strong>Feedback submitted:</strong> {feedback}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500">
                  <FiShield className="h-8 w-8 text-green-600 inline-block mr-2" />
                  <span className="text-xl font-semibold text-green-700">
                    No threats detected
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-700 text-lg">Select a system to view details</div>
          )}
        </div>
      </div>
    </div>
  );
}
