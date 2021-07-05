const path = require('path')
const fs = require('fs')
const ora = require('ora')
const shell = require('shelljs')
const package = path.resolve(__dirname, '../package.json')
const symbols = require('log-symbols')
const chalk = require('chalk')
const inquirer = require('inquirer')

const spinner = ora('').start()
spinner.start()
// 执行打包脚本
const build_lib = async (srcipt) => {
	startLog('>>>> 开始执行 <<<<')
	const res = shell.exec(`${srcipt}`)
	if (res.code === 0) {
		successLog('项目打包成功!')
	} else {
		errorLog('项目打包失败, 请重试!')
		process.exit() //退出流程
	}
}

// 检查package版本
const check_version = async () => {
  if(!fs.existsSync(package)) {
    errorLog('文件不存在！')
    return
  }
	const data = fs.readFileSync(package)
	if (data) {
		const json = JSON.parse(data)
		infoLog(`当前package版本为：${json.version}`)
	} else {
		errorLog('读取失败！')
	}
}

// 输入版本号
function set_version() {
	const list = [
		{
			name: 'verison',
			message: '请输入迭代版本号：',
		},
	]
	return inquirer.prompt(list)
}

// 修改版本号
function edit_verison(v) {
	fs.readFile(package, 'utf8', (err, data) => {
		if (err) {
			errorLog('读取失败！')
		} else {
			const json = JSON.parse(data.toString())
			json.version = v
			fs.writeFile(package, JSON.stringify(json, null, '\t'), (e) => {
				if (e) {
					errorLog('写入失败！原因：/n', e)
				}
			})
		}
	})
}

// 发布npm
// npm 登录一次后会把token留在配置文件
function publish_npm() {
  shell.exec('npm publish')
}
// 开始部署日志
function startLog(...content) {
	console.log(chalk.magenta(...content))
}

// 信息日志
function infoLog(...content) {
	console.log(symbols.info, chalk.blue(...content))
}

// 成功日志
function successLog(...content) {
	console.log(symbols.success, chalk.green(...content))
}

// 错误日志
function errorLog(...content) {
	console.log(chalk.red(...content))
}

// 下划线重点输出
function underlineLog(content) {
	return chalk.blue.underline.bold(`${content}`)
}

spinner.stop();
(async () => {
	await check_version()
	let { verison } = await set_version()
	await edit_verison(verison)
	await build_lib('npm run build')
	await publish_npm()
})()
