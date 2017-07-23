
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

export default Mock;
