const MiniAttenetendce=({attendence,section})=>{
  console.log("at",attendence);
    return <>
       <div>
          <div>
          <table className="table-auto">
      <thead>
        <tr>
          <th>Section</th>
          <th>Name</th>
          {/* Add more attribute headers as needed */}
        </tr>
      </thead>
      <tbody>
        {attendence.map((item, index) => (
            item.period1 &&
          <tr key={index}>
            <td>{section}</td>
            <td>{item.name}</td>
            {/* Add more cells for additional attributes */}
          </tr>
        ))}
      </tbody>
    </table>
          </div>
       </div>
    </>
}
export {MiniAttenetendce}