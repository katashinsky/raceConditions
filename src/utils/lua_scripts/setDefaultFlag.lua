local key = KEYS[1]

redis.call('set', key, 'UNLOCKED')

