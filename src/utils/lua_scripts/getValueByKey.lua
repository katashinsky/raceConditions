local key = KEYS[1]

local value = redis.call('get', key)

return value
