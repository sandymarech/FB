import { useMediaQuery } from "react-responsive";
export default function DateOfBirthSelect( { bMonth, bDay,bYear,month,day,year,handleRegisterChange,dateError, } ) {
    const view1 = useMediaQuery({
        query: "(min-width: 539px)",
      });
      const view2 = useMediaQuery({
        query: "(min-width: 850px)",
      });
      const view3 = useMediaQuery({
        query: "(min-width: 1170px)",
      });
    return (
        <div className="reg_grid" style={{marginBottom: `${dateError && !view3 ? "90px":"0"}`}}>
          <select name="bMonth" value={bMonth} onChange={handleRegisterChange}>
            {month.map((month, i) => (
              <option value={month} key={i}>
                {month}
              </option>
            ))}
          </select>
          <select name="bDay" value={bDay} onChange={handleRegisterChange}>
            {day.map((day, i) => (
              <option value={day} key={i}>
                {day}
              </option>
            ))}
          </select>
          <select name="bYear" value={bYear} onChange={handleRegisterChange}>
            {year.map((year, i) => (
              <option value={year} key={i}>
                {year}
              </option>
            ))}
          </select>
          {dateError && (<div className={!view3 ? 'input_error':'input_error input_error_select_large'}>
            <div className={!view3 ? 'error_arrow_bottom':'error_arrow_left'}>
            </div>{dateError}</div>)}
        </div>
      );
    }