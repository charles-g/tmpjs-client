import React from 'react';

async function getData() {
    const res = await fetch('http://localhost:3000/find');
    return res.json();
}

// Positions Component
const Positions = ({ items }) => {
    return (
        <div>
            <label htmlFor="positions">Select Position:</label>
            <select id="positions" name="positions">
                {items.map(position => (
                    <option key={position.id} value={position.id}>
                        {position.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

// MaxDistance Component
const MaxDistance = ({ max }) => {
    return (
        <div>
            <label htmlFor="maxDistance">Max Distance (in km):</label>
            <input
                type="number"
                id="maxDistance"
                name="maxDistance"
                min="1"
                max="100"
                defaultValue={max}
            />
        </div>
    );
};

// FormFilters Component
const FormFilters = () => {
    const positions = [
        { id: 1, name: 'Etudiant' },
        { id: 2, name: 'Preparateur en pharmacie' },
        { id: 3, name: 'Pharmacien' },
    ];
    const maxDistance = 35;

    return (
        <div className="flex gap-5">
            <Positions items={positions} />
            <MaxDistance max={maxDistance} />
        </div>
    );
};


const Home = async () => {

    const data = await getData();

    if (!data?.items) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Company Details</h1>
                <p>No data found</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Companies</h1>
            <div className="mb-4">
                <FormFilters />
            </div>
            <div className="mb-4">
                Count: {data.count}
            </div>

            {data.items.map((company) => (
                <div key={company.companyId} className="mb-8 border p-4 bg-white rounded">
                    <h2 className="text-2xl font-bold mb-2">{company.companyName}</h2>
                    <p className="text-gray-600 mb-2">
                        Distance to worker: {company.distanceToWorkerInKm.toFixed(2)} km
                    </p>

                    <div className="mb-4">
                        <h3 className="text-xl font-bold mb-2">Skills</h3>
                        <ul className="list-disc pl-6">
                            {company.companySkills.map((skill) => (
                                <li key={skill.id_company_skill}>{skill.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-xl font-bold mb-2">Available Contract Time Slots</h3>
                        <ul className="list-disc pl-6">
                            {company.companyAvailableContractTimeSlots.map((timeSlot) => (
                                <li key={timeSlot.id_company_available_contract_time_slot}>
                                    {timeSlot.contract_position_name} - {timeSlot.day_date}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-2">Post Contract Feedbacks</h3>
                        <p>Positive Count: {company.postContractFeedbacks.positiveCount}</p>
                        <p>Negative Count: {company.postContractFeedbacks.negativeCount}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
