# JEDI 850 -> QuickBooks Online Estimate

## Summary

This Mapping shows how a `JEDI 850 Purchase Order` can be mapped to the QuickBooks Online `Estimate` object.

1. **Source JSON:** 005010 JEDI 850 Purchase Order ([link](https://edi.stedi.com/inspector?value=ISA*00*++++++++++*00*++++++++++*01*040132628++++++*ZZ*012550194U+++++*220114*0656*U*00501*000016214*0*P*%3E%7E%0AGS*PO*040132628*012550194U*20220114*0656*000016214*X*005010%7E%0AST*850*0001%7E%0ABEG*00*DS*2583033**20220114%7E%0APER*OC*John+Doe*TE*111-222-7475*EM*johndoe-fake%40gmail.com%7E%0ATD5****ZZ*FHD%7E%0AN1*ST*Ben+Ford*92*DROPSHIP+CUSTOMER%7E%0AN3*2113+Anywhere+St%7E%0AN4*Pasadena*TX*77502*US%7E%0APO1*1*0001*EA*0626.6**VC*80310*SK*SKU12345%7E%0APID*F****Ocho%27s+Octopus+Chips%7E%0APID*F****Great+flavor%7E%0ACTT*1%7E%0AAMT*TT*626.6%7E%0ASE*13*0001%7E%0AGE*1*000016214%7E%0AIEA*1*000016214%7E%0A&view=json))
2. **Target JSON:** QuickBooks Online Estimate ([link](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/estimate)).

## Deploy this Mapping to your Stedi account

Once you have created a [Stedi account](https://terminal.stedi.com/sign-up?email=), you can deploy this Mapping by clicking on the button below:

[![Run on Stedi](./../RunOnStedi.svg)](https://terminal.stedi.com/mappings/import?mapping=https://raw.githubusercontent.com/Stedi/starter-kit/main/mappings-examples/jedi-850-to-quickbooks-online-estimate/mapping.json&source_json=https://raw.githubusercontent.com/Stedi/starter-kit/main/mappings-examples/jedi-850-to-quickbooks-online-estimate/jedi-850.json&target_json=https://raw.githubusercontent.com/Stedi/starter-kit/main/mappings-examples/jedi-850-to-quickbooks-online-estimate/quickbooks-online-estimate.json)

## Build your own Mapping

### JEDI 850 Purchase Order

You can create a Mapping targeting JEDI 850 by clicking on one of the buttons below:

[![Map from this schema](./../MapFromThisSchema.svg)](https://terminal.stedi.com/mappings/import?mapping=https://raw.githubusercontent.com/Stedi/starter-kit/main/mappings-examples/jedi-850-to-quickbooks-online-estimate/empty-jedi-850-mapping.json&source_json_schema=https://raw.githubusercontent.com/Stedi/starter-kit/main/mappings-examples/jedi-850-to-quickbooks-online-estimate/jedi-850-schema.json)

[![Map to this schema](./../MapToThisSchema.svg)](https://terminal.stedi.com/mappings/import?mapping=https://raw.githubusercontent.com/Stedi/starter-kit/main/mappings-examples/jedi-850-to-quickbooks-online-estimate/empty-jedi-850-mapping.json&target_json_schema=https://raw.githubusercontent.com/Stedi/starter-kit/main/mappings-examples/jedi-850-to-quickbooks-online-estimate/jedi-850-schema.json)

### QuickBooks Online Estimate

You can create a Mapping targeting QuickBooks Online Estimate by clicking on one of the buttons below:

[![Map from this schema](./../MapFromThisSchema.svg)](https://terminal.stedi.com/mappings/import?mapping=https://raw.githubusercontent.com/Stedi/starter-kit/main/mappings-examples/jedi-850-to-quickbooks-online-estimate/empty-quickbooks-online-estimate-mapping.josn&source_json_schema=https://raw.githubusercontent.com/Stedi/starter-kit/main/mappings-examples/jedi-850-to-quickbooks-online-estimate/quickbooks-online-estimate-schema.json)

[![Map to this schema](./../MapToThisSchema.svg)](https://terminal.stedi.com/mappings/import?mapping=https://raw.githubusercontent.com/Stedi/starter-kit/main/mappings-examples/jedi-850-to-quickbooks-online-estimate/empty-quickbooks-online-estimate-mapping.josn&target_json_schema=https://raw.githubusercontent.com/Stedi/starter-kit/main/mappings-examples/jedi-850-to-quickbooks-online-estimate/quickbooks-online-estimate-schema.json)
