import postcssPresetEnv from 'postcss-preset-env'
import simpleVars from 'postcss-simple-vars'

export default {
	plugins: [postcssPresetEnv({ stage: 1 }), simpleVars()],
}
