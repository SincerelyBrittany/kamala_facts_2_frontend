import React, { useState, useEffect } from "react";
import PageSearchBar from "../Search/PageSearchBar";
import Notes from "../../Notes";

export default function Myths() {
    // usestate
    const [myths, setMyths] = useState({});
    const [Loading, setLoading] = useState(false);
    const [inputData, setInputData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://kamala-facts-2-backend.herokuapp.com/api/v1/myths");
            const data = await response.json();
            setMyths(data);
            setLoading(true);
        };

        fetchData();
    }, []);

    console.log("hii");

    console.log(myths);
    console.log(Loading);

    // im mapping over object values, then mapping over nested array values(Marlo)
    const mapMyths = Object.values(myths)
        .filter((item) => {
            let thing;
            if (!inputData) {
                thing = item;
            } else if (item.lie_statement.toLocaleLowerCase().includes(inputData.toLocaleLowerCase())) {
                thing = item;
            }
            return thing;
        })
        .map((item) => {
            return (
                <div key={item.id}>
                    <h3>`Myth: ${item.lie_statement}`</h3>
                    {item.facts.map((fact) => {
                        return <p>`Truth: {fact.truth_statement}`</p>;
                    })}
                </div>
            );
        });

    return (
        <div className="App">
            <center>
                <Notes />
                <img
                    class="Kamala-pic-1"
                    src="https://www.gannett-cdn.com/presto/2019/12/05/USAT/751f29ad-47cd-4791-9506-d4b6b846b53e-KamalaHarris.jpg"
                    alt="Kamala Harris"
                />

                <PageSearchBar setInputData={setInputData} inputData={inputData} />
                <p>{inputData}</p>

                <h1>The myths will render here </h1>
                {Loading ? mapMyths : <div>Loading</div>}
            </center>
        </div>
    );
}
