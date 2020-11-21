import redis
from reddit_dashboard.settings import REDIS_DATABASE, REDIS_HOST, REDIS_PORT

REDIS_CONNECTION = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DATABASE)

class RedisConsts(object):
    DISCORD_PUSH = 'discord:push'
    SERVER_PUSH = 'django:model'




