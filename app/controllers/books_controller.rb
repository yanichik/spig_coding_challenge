class BooksController < ApplicationController
  require 'uri'
  require 'net/http'

  def index
    uri = URI('https://sfof9o2xn8.execute-api.us-east-1.amazonaws.com/books')
    res = Net::HTTP.get_response(uri)
    @books = JSON.parse(res.body, symbolize_names: true)[:body] if res.is_a?(Net::HTTPSuccess)
    render json: @books
  end
end
