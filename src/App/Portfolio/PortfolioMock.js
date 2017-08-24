
import uuid from 'uuid/v1';

const Mock = {
    accounts: [
        {
            id: uuid(),
            name: 'TFSA - Questrade',
            securities: [
                {
                    id: uuid(),
                    symbol: 'VAB.TO',
                    cost: 20,
                    portPercentTarget: 15,
                    mktValue: 1000,
                    buyQty: 0
                },
                {
                    id: uuid(),
                    symbol: 'VDU.TO',
                    cost: 20,
                    portPercentTarget: 25,
                    mktValue: 3944.48,
                    buyQty: 0
                },
                {
                    id: uuid(),
                    symbol: 'ZRE.TO',
                    cost: 20,
                    portPercentTarget: 10,
                    mktValue: 1612.12,
                    buyQty: 0
                },
                {
                    id: uuid(),
                    symbol: 'VUN.TO',
                    cost: 20,
                    portPercentTarget: 15,
                    mktValue: 3716.20,
                    buyQty: 0
                },
                {
                    id: uuid(),
                    symbol: 'VCN.TO',
                    cost: 20,
                    portPercentTarget: 15,
                    mktValue: 3728.32,
                    buyQty: 0
                }
            ],
            cash: {
                symbol: 'Cash',
                mktValue: 2000,
                portPercentTarget: 0,
            },
            closed: false
        },
        {
            id: uuid(),
            name: 'RRSP - Questrade',
            securities: [
                {
                    id: uuid(),
                    symbol: 'VAB.TO',
                    cost: 20,
                    portPercentTarget: 0,
                    mktValue: 1000,
                    buyQty: 0
                },
                {
                    id: uuid(),
                    symbol: 'VDU.TO',
                    cost: 20,
                    portPercentTarget: 0,
                    mktValue: 1706.46,
                    buyQty: 0
                },
                {
                    id: uuid(),
                    symbol: 'ZRE.TO',
                    cost: 20,
                    portPercentTarget: 0,
                    mktValue: 589.80,
                    buyQty: 0
                },
                {
                    id: uuid(),
                    symbol: 'ZAG.TO',
                    cost: 20,
                    portPercentTarget: 10,
                    mktValue: 1879.96,
                    buyQty: 0
                },
                {
                    id: uuid(),
                    symbol: 'XAW.TO',
                    cost: 20,
                    portPercentTarget: 10,
                    mktValue: 1680.80,
                    buyQty: 0
                }
            ],
            cash: {
                symbol: 'Cash',
                mktValue: 2000,
                portPercentTarget: 0
            },
            closed: false
        }
    ]
}


let mockStorage = [{"id":"4ab093b1-7f8a-11e7-ad2c-d1d899b9e1a6","name":"TFSA - Questrade","securities":[{"id":"4ab093b0-7f8a-11e7-ad2c-d1d899b9e1a6","symbol":"VCN.TO","cost":30.43,"portPercentTarget":25,"mktValue":4867.2,"buyQty":0,"displayColor":"128,85,252","status":{"type":"Success","message":null}},{"id":"75ce2cb0-7f8a-11e7-ad2c-d1d899b9e1a6","symbol":"VAB.TO","cost":25.39,"portPercentTarget":20,"mktValue":4003.72,"buyQty":0,"displayColor":"223,56,253","status":{"type":"Success","message":null}},{"id":"78406530-7f8a-11e7-ad2c-d1d899b9e1a6","symbol":"ZRE.TO","cost":19.65,"portPercentTarget":10,"mktValue":1862.95,"buyQty":0,"displayColor":"252,75,135","status":{"type":"Success","message":null}},{"id":"7b9b5000-7f8a-11e7-ad2c-d1d899b9e1a6","symbol":"VDU.TO","cost":33.33,"portPercentTarget":20,"mktValue":4325.1,"buyQty":0,"displayColor":"252,101,41","status":{"type":"Success","message":null}},{"id":"8374e520-7f8a-11e7-ad2c-d1d899b9e1a6","symbol":"VUN.TO","cost":43.13,"portPercentTarget":25,"mktValue":3876.3,"buyQty":0,"displayColor":"252,219,41","status":{"type":"Success","message":null}}],"cash":{"symbol":"Cash","mktValue":26.06,"portPercentTarget":0,"displayColor":"217,217,217"},"closed":false},{"id":"c058a9e1-7f8a-11e7-ad2c-d1d899b9e1a6","name":"RRSP - Questrade","securities":[{"id":"c058a9e0-7f8a-11e7-ad2c-d1d899b9e1a6","symbol":"VAB.TO","cost":25.39,"portPercentTarget":0,"mktValue":1267,"buyQty":0,"displayColor":"223,56,253","status":{"type":"Success","message":null}},{"id":"c4ed2620-7f8a-11e7-ad2c-d1d899b9e1a6","symbol":"VCN.TO","cost":30.43,"portPercentTarget":0,"mktValue":1673.1,"buyQty":0,"displayColor":"128,85,252","status":{"type":"Success","message":null}},{"id":"c895bbc0-7f8a-11e7-ad2c-d1d899b9e1a6","symbol":"VDU.TO","cost":33.33,"portPercentTarget":0,"mktValue":1696.77,"buyQty":0,"displayColor":"252,101,41","status":{"type":"Success","message":null}},{"id":"cc79acb0-7f8a-11e7-ad2c-d1d899b9e1a6","symbol":"VUN.TO","cost":43.13,"portPercentTarget":0,"mktValue":1895.08,"buyQty":0,"displayColor":"252,219,41","status":{"type":"Success","message":null}},{"id":"cfef7280-7f8a-11e7-ad2c-d1d899b9e1a6","symbol":"ZRE.TO","cost":19.65,"portPercentTarget":0,"mktValue":588.3,"buyQty":0,"displayColor":"252,75,135","status":{"type":"Success","message":null}}],"cash":{"symbol":"Cash","mktValue":0,"portPercentTarget":0,"displayColor":"217,217,217"},"closed":false}];

export default Mock;
