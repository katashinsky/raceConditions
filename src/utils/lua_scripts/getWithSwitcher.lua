local key = KEYS[1]

local value = redis.call('get', key)

redis.call('set', key, 'LOCKED');

return value
