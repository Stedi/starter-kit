# JEDI 846 -> Shopify InventoryLevel API

## Summary

This Mapping shows how a `JEDI 846 Inventory Inquiry/Advice` can be mapped to the Shopify Inventory Level API object.

1. **Source JSON:** 005010 JEDI 846 Inventory Inquiry/Advice ([link](https://edi.stedi.com/inspector?value=ISA*00*++++++++++*00*++++++++++*ZZ*VENDOR1++++++++*ZZ*VENDOR2++++++++*080901*0201*U*00401*000012911*0*T*%3E%7E%0AGS*IB*VENDOR1*VENDOR2*20080901*0201*12911*X*005010%7E%0AST*846*0001%7E%0ABIA*00*IP*201312111545*20131211*1545%7E%0AN1*WH*1234554321%7E%0ALIN*1*UP*12345%7E%0AQTY*33*100*EA%7E%0ALIN*1*UP*6789%7E%0AQTY*33*200*EA%7E%0ALIN*1*UP*10111213%7E%0AQTY*33*300*EA%7E%0ASE*6*0001%7E%0AGE*1*12911%7E%0AIEA*1*000012911%7E%0A&view=json)).
2. **Target JSON:** Shopify InventoryLevel API object ([link](https://shopify.dev/api/admin-rest/2021-10/resources/inventorylevel#[post]/admin/api/2021-10/inventory_levels/adjust.json)).

## Deploy this Mapping to your Stedi account

Once you have created a [Stedi account](https://terminal.stedi.com/sign-up?email=), you can deploy this Mapping by clicking on the button below:

[![Run on Stedi](./../RunOnStedi.svg)](https://terminal.stedi.com/mappings/import?mapping=https://raw.githubusercontent.com/Stedi/starter-kit/main/mappings-examples/jedi-846-shopify-inventorylevel/mapping.json&source_json=https://raw.githubusercontent.com/Stedi/starter-kit/main/mappings-examples/jedi-846-shopify-inventorylevel/jedi-846.json&target_json=https://raw.githubusercontent.com/Stedi/starter-kit/main/mappings-examples/jedi-846-shopify-inventorylevel/shopify-inventorylevel.json&referrer=starter-kit)
