# 项目目录

## 核心代码

├── src
│   ├── abort-controller.ts
│   ├── airtable.ts
│   ├── airtable_base.ts
│   ├── airtable_error.ts 错误处理类
│   ├── attachment.ts
│   ├── base.ts
│   ├── callback_to_promise.ts
│   ├── collaborator.ts
│   ├── deprecate.ts
│   ├── exponential_backoff_with_jitter.ts
│   ├── fetch.ts
│   ├── field_set.ts
│   ├── has.ts
│   ├── http_headers.ts
│   ├── internal_config.json
│   ├── object_map.ts
│   ├── object_to_query_param_string.ts
│   ├── package_version.ts
│   ├── package_version_browser.ts
│   ├── query.ts
│   ├── query_params.ts
│   ├── record.ts
│   ├── record_data.ts
│   ├── records.ts
│   ├── run_action.ts
│   ├── table.ts
│   ├── thumbnail.ts
│   └── typecheck.ts


## 配置文件

├── build
│   └── airtable.browser.js
├── gruntfile.js
├── lib
│   └── internal_config.json
├── package.json
├── scripts
│   └── check-is-build-fresh.sh
└── tsconfig.json


## 测试文件

├── test
│   ├── airtable.test.js
│   ├── airtable_error.test.js
│   ├── base.test.js
│   ├── browser_build.test.js
│   ├── callback_to_promise.test.js
│   ├── create.test.js
│   ├── delete.test.js
│   ├── deprecate.test.js
│   ├── find.test.js
│   ├── has.test.js
│   ├── list.test.js
│   ├── node_version.test.js
│   ├── object_to_query_param_string.test.js
│   ├── record.test.js
│   ├── select.test.js
│   ├── self_signed.cert
│   ├── self_signed.key
│   ├── table.test.js
│   ├── test_files
│   │   ├── airtable.browser.js
│   │   └── index.html
│   ├── test_helpers.js
│   ├── typecheck.test.js
│   └── update.test.js
