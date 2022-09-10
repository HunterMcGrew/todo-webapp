

const Stats = (props) => {

    return (

        <div className="stats todo d-flex justify-content-between align-items-center"  data-theme={props.theme}>
            <span className="statsText"  data-theme={props.theme}>{props.allDb.length} items left</span>
            <span className="statsText clearBtn" onClick={props.deleteCompleted}  data-theme={props.theme}>Clear Completed</span>
        </div>

    )
}

export default Stats;