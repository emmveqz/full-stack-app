import React, {
  FC,
  useEffect,
  useState,
} from "react"
import {
  IProps,
} from "./types"
import {
  PayEngineScriptUrl,
} from "../../config"
import {
  useExternalScript,
} from "../../hooks/useExternalScript"

//

const PEOnboarding: FC<IProps> = ({ apiPublicKey, merchantId }) => {
  const scriptUrl = PayEngineScriptUrl.replace("{public_key}", apiPublicKey)
  const scriptStatus = useExternalScript(scriptUrl)
  const [renderedComp, setRenderedComp] = useState<React.ReactElement>(<>{scriptStatus}</>)

  useEffect(() => {
    if (scriptStatus !== "ready") {
      setRenderedComp(<>{scriptStatus}</>)
    }

    const payEngineNode = React.createElement("pay-engine", {
      id: "pf-onboarding",
      css: "#onboarding-styles",
      type: "boarding",
      'merchant-id': merchantId,
    })

    setRenderedComp(payEngineNode)
  }, [scriptStatus])


  return renderedComp
}

export default PEOnboarding
