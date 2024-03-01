import React from 'react';

function Clue({ clue }) {
    return (
        <div className={"clue"} >
            {clue.map((num, i) =>
                <div key={i}>
                    {num}
                </div>
            )}
        </div>
    );
}



export default Clue;