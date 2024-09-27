import { useState } from "react"
import "./guide.css"
import DashboardGuide from "./DashboardGuide"
import HotkeysGuide from "./HotkeysGuide"

export default function Guide(){
    const [section,setSection] = useState(0)

    return(
    <div className="menu" style={{"padding":"0px"}} id="guide">
        <table>
        <tr>
            <td className="left-bar">
                <h2>Guides</h2>
                <ul>
                    <li onClick={() => setSection(0)}>Dashboard basics</li>
                    <li onClick={() => setSection(1)}>Keyboard Shortcuts</li>
                </ul>
            </td>
            <td>
                {(() => {
                    switch(section){
                        case 0:
                            return <DashboardGuide/>
                        case 1:
                            return <HotkeysGuide/>
                    }
                })()}
            </td>
        </tr>
        </table>
    </div>
    )
}