// React imports 
import React, { useState, useEffect } from "react";


import Parent from '../components/Parent';
import Child from '../components/Child';

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
const Layout:React.FC = () => {

    const [parentName, setParentName] = useState<string>('John Obi')
    
    return (
            <div>
    
            <FirstChild name={parentName} />
            <SecondChild name={parentName} />
    
            </div>
    
    )
}

export default Parent;