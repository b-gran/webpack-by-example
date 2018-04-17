import React from 'react'
import R from 'ramda'
import _ from 'lodash'
import { foo, bar } from './shared'

console.log('===ENTRY 1===')
console.log(React, R, _)
console.log(foo(), bar())
console.log('=============')
