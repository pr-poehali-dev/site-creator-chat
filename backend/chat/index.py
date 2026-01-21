import json
import os
import psycopg2
from datetime import datetime

def handler(event: dict, context) -> dict:
    """
    API для работы с чатом: получение и отправка сообщений
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database connection not configured'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(dsn)
    cursor = conn.cursor()
    
    try:
        if method == 'GET':
            cursor.execute("""
                SELECT id, user_id, username, message_text, is_creator, 
                       TO_CHAR(created_at, 'HH24:MI') as timestamp,
                       created_at
                FROM messages 
                ORDER BY created_at ASC
            """)
            rows = cursor.fetchall()
            
            messages = []
            for row in rows:
                messages.append({
                    'id': row[0],
                    'userId': row[1],
                    'username': row[2],
                    'text': row[3],
                    'isCreator': row[4],
                    'timestamp': row[5],
                    'createdAt': row[6].isoformat() if row[6] else None
                })
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'messages': messages}),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            user_id = body.get('userId', 'anonymous')
            username = body.get('username', 'Гость')
            message_text = body.get('messageText', '').strip()
            is_creator = body.get('isCreator', False)
            
            if not message_text:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Message text is required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute("""
                INSERT INTO messages (user_id, username, message_text, is_creator, created_at)
                VALUES (%s, %s, %s, %s, CURRENT_TIMESTAMP)
                RETURNING id, TO_CHAR(created_at, 'HH24:MI') as timestamp
            """, (user_id, username, message_text, is_creator))
            
            result = cursor.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'messageId': result[0],
                    'timestamp': result[1]
                }),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()
