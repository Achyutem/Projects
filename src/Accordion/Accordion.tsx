import { useState } from "react"
import './Accodion.css'

const Accodion = () => {
    const[open,setOpen] = useState<number[]>([])
    const[multiOpen, setMultiOpen] = useState(false)
    const data = ['Accodian1','Accodian2','Accodian3','Accodian4']
    const toggleAcc = (index: number) => {
        if(multiOpen){
            if (open.includes(index)){
                setOpen(open.filter(i => i !== index));
            } else {
                setOpen([...open,index]);
            }
        } else {
            setOpen(open.includes(index) ? [] : [index])
        }
    }

    const handleCheckbox = (e : React.ChangeEvent<HTMLInputElement>) => {
        setMultiOpen(e.target.checked)

        if (!e.target.checked && open.length > 1) {
            setOpen([open[0]])
        }
    }

    return (
      <>
        <div className="stack">
          <div className="contain">
            <h2>Accodion Multiple</h2>
            <input type="checkbox" checked={multiOpen} onChange={handleCheckbox} />
          </div>
          {data.map((dt, index) => (
            <div key={index} className={`block ${open.includes(index) ? 'open' : ''}`}>
              <div>
                <div className="hold">
                  <h4>{dt}</h4>
                  <h4 className="btn" onClick={() => toggleAcc(index)}>
                    {open.includes(index) ? '-' : '+'}
                  </h4>
                </div>
                {open.includes(index) && (
                  <p className="hold">this is the content for {dt}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    );
}

export default Accodion