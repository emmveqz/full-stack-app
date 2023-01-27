import {
  useCallback,
  useState,
} from "react"
import {
  ApiResponseStatus,
  IApiResponse,
  IBLResult,
  IFieldsMap,
  IUser,
} from "./types"
import {
  ApiEndpoint,
} from "../../config"

//

const RequiredFields: Array<keyof IFieldsMap> = [
  "email",
  "name",
]

const getMerchantId = async (fieldsValues: IFieldsMap): Promise<string|Error> => {
  try {
    const response = await fetch(`${ApiEndpoint}/api/getmerchant`, {
      body: JSON.stringify(fieldsValues),
      headers: {
        'Content-Type': "application/json",
      },
      method: "post",
    })

    const result: IApiResponse<IUser> = await response.json()

    if (result.status !== ApiResponseStatus.Success) {
      return new Error(result.msg)
    }
    else if (!result.data) {
      return new Error("could not retrieve data")
    }
    else {
      return result.data.merchant_id
    }
  }
  catch (ex) {
    return new Error((ex as Error).message)
  }
}

export const useSignupBL = (): IBLResult => {
  const [errors, setErrors] = useState<IBLResult["errors"]>({})
  const [message, setMessage] = useState<IBLResult["message"]>()
  const [merchantId, setMerchantId] = useState<IBLResult["merchantId"]>()
  const [fieldsValues, setFieldsValues] = useState<IFieldsMap>({})

  const onFieldChanged = useCallback<IBLResult["onFieldChanged"]>((ev) => {
		ev.persist()

    setFieldsValues( (prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }) )

    setErrors( (prev) => ({
      ...prev,
      [ev.target.name]: !ev.target.value ? "Cannot be empty" : undefined,
    }) )
  }, [])

  const submitForm = useCallback<IBLResult["submitForm"]>(async () => {
    const containsErrors = Object.values(errors).some((error) => !!error)

    if (containsErrors) {
      return
    }

    const emptyReqFields = RequiredFields.filter((field) => !fieldsValues[field])

    if (emptyReqFields.length) {
      const newErrors = emptyReqFields.reduce<IBLResult["errors"]>((prevObj, field) => ({
        ...prevObj,
        [field]: "Cannot be empty",
      }), {})

      setErrors( (prev) => ({
        ...prev,
        ...newErrors,
      }) )

      return
    }

    try {
      const merchId = await getMerchantId(fieldsValues)

      if (merchId instanceof Error) {
        setMessage(merchId.message)
      }
      else {
        setMerchantId(merchId)
      }
    }
    catch (ex) {
      setMessage((ex as Error).message)
    }
  }, [
    errors,
    fieldsValues,
  ])

  return {
    errors,
    merchantId,
    message,
    onFieldChanged,
    submitForm,
  }
}
